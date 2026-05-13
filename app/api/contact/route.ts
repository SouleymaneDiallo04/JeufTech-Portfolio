import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { prenom, nom, email, telephone, sujet, message } = await req.json()

    if (!email || !message) {
      return NextResponse.json({ error: 'Email et message requis' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio JeufTech <onboarding@resend.dev>',
      to: ['sd100615@gmail.com'],
      replyTo: email,
      subject: sujet ? `[Portfolio] ${sujet}` : `[Portfolio] Nouveau message de ${prenom} ${nom}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #F5F0E8; padding: 32px; border-radius: 12px;">
          <h2 style="color: #8B4513; font-size: 20px; margin-bottom: 4px;">Nouveau message — Portfolio JeufTech</h2>
          <hr style="border: none; border-top: 1px solid rgba(139,69,19,.2); margin: 16px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #9A8070; font-size: 12px; width: 80px;">De</td><td style="color: #2C1A0E; font-size: 14px; font-weight: 600;">${prenom} ${nom}</td></tr>
            <tr><td style="padding: 6px 0; color: #9A8070; font-size: 12px;">Email</td><td style="color: #2C1A0E; font-size: 14px;"><a href="mailto:${email}" style="color: #8B4513;">${email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #9A8070; font-size: 12px;">Tél</td><td style="color: #2C1A0E; font-size: 14px;">${telephone || '—'}</td></tr>
            <tr><td style="padding: 6px 0; color: #9A8070; font-size: 12px;">Sujet</td><td style="color: #2C1A0E; font-size: 14px;">${sujet || '—'}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid rgba(139,69,19,.2); margin: 16px 0;" />
          <div style="background: #fff; border-radius: 8px; padding: 16px; border: 1px solid rgba(139,69,19,.15);">
            <p style="color: #9A8070; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
            <p style="color: #2C1A0E; font-size: 14px; line-height: 1.75; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #9A8070; font-size: 11px; margin-top: 24px; text-align: center;">Portfolio de Souleymane Diallo · JeufTech · 2026</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
