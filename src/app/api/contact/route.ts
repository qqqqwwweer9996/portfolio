import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { profile } from "@/lib/data";

// Validate the incoming payload (same Zod approach used in the cafe-menu-api).
const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요.").max(100),
  email: z.string().email("올바른 이메일 형식이 아니에요."),
  message: z.string().min(5, "메시지를 5자 이상 입력해주세요.").max(5000),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "요청 형식이 올바르지 않아요." },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY가 없습니다. .env.local에 키를 넣고 dev 서버를 재시작하세요.",
    );
    return NextResponse.json(
      { ok: false, error: "메일 서비스가 아직 설정되지 않았어요. (서버에 API 키 필요)" },
      { status: 503 },
    );
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: profile.email,
      replyTo: email, // 답장하면 보낸 사람에게 바로 감
      subject: `[포트폴리오] ${name}님의 메시지`,
      text: `이름: ${name}\n이메일: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend 전송 오류:", error);
      return NextResponse.json(
        { ok: false, error: "메일 전송에 실패했어요. 잠시 후 다시 시도해주세요." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] 예외 발생:", err);
    return NextResponse.json(
      { ok: false, error: "메일 전송 중 오류가 발생했어요." },
      { status: 500 },
    );
  }
}
