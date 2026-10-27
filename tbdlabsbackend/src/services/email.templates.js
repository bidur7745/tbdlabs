function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function paragraph(text) {
  return `<p style="margin:0 0 16px;color:#c5cad5;font:15px/1.7 Arial,sans-serif;">${text}</p>`;
}

function emailLayout({ preheader, eyebrow = 'TBD LABS', title, content, footer = 'Technology Beyond Dimensions' }) {
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;background:#08090d;color:#f3f4f6;font-family:Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#08090d;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#10121a;border:1px solid #272b38;border-radius:16px;overflow:hidden;">
          <tr><td style="padding:28px 32px;border-bottom:1px solid #272b38;">
            <div style="color:#00b4d8;font-size:12px;font-weight:bold;letter-spacing:2px;">${escapeHtml(eyebrow)}</div>
            <h1 style="margin:14px 0 0;color:#f3f4f6;font-size:25px;line-height:1.25;">${escapeHtml(title)}</h1>
          </td></tr>
          <tr><td style="padding:28px 32px;">${content}</td></tr>
          <tr><td style="padding:20px 32px;border-top:1px solid #272b38;color:#8b93a3;font-size:12px;">${escapeHtml(footer)}</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function clientConfirmationTemplate({ name }) {
  const safeName = escapeHtml(name);
  return {
    subject: 'We received your message | TBD Labs',
    text: `Hello ${name},\n\nThank you for contacting TBD Labs. We received your project inquiry and our team will review it.\n\nTBD Labs\nTechnology Beyond Dimensions`,
    html: emailLayout({
      preheader: 'Your message has reached the TBD Labs team.',
      title: 'Thanks for reaching out',
      content: `${paragraph(`Hello ${safeName},`)}${paragraph('We received your project inquiry. The TBD Labs team will review the details and follow up with you.')}${paragraph('If you need to add context, reply to this email.')}`,
    }),
  };
}

function staffInquiryTemplate({ inquiry }) {
  const safeMessage = escapeHtml(inquiry.message).replace(/\r?\n/g, '<br>');
  const safeText = (value) => value ? escapeHtml(value) : 'Not provided';
  const fields = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone],
    ['Organization', inquiry.organization],
    ['Service', inquiry.service],
    ['Budget', inquiry.budget],
  ].map(([label, value]) => `<tr><td style="padding:8px 12px 8px 0;color:#8b93a3;vertical-align:top;">${label}</td><td style="padding:8px 0;color:#f3f4f6;overflow-wrap:anywhere;">${safeText(value)}</td></tr>`).join('');
  return {
    subject: 'New project inquiry | TBD Labs',
    text: [
      'A new inquiry was received.',
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone || 'Not provided'}`,
      `Organization: ${inquiry.organization || 'Not provided'}`,
      `Service: ${inquiry.service}`,
      `Budget: ${inquiry.budget || 'Not provided'}`,
      '',
      inquiry.message,
    ].join('\n'),
    html: emailLayout({
      preheader: 'A new project inquiry is waiting in the TBD Labs inbox.',
      eyebrow: 'INQUIRY NOTIFICATION',
      title: 'New project inquiry',
      content: `<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;font:14px/1.5 Arial,sans-serif;">${fields}</table><h2 style="margin:24px 0 8px;color:#f3f4f6;font-size:16px;">Project brief</h2><div style="padding:16px;background:#090b10;border:1px solid #272b38;border-radius:10px;color:#c5cad5;font:14px/1.7 Arial,sans-serif;overflow-wrap:anywhere;">${safeMessage}</div>`,
    }),
  };
}

function staffReplyTemplate({ staffName, messageBody }) {
  const safeMessage = escapeHtml(messageBody).replace(/\r?\n/g, '<br>');
  return {
    subject: 'A message from TBD Labs',
    text: `${staffName} from TBD Labs sent you a message:\n\n${messageBody}`,
    html: emailLayout({
      preheader: 'A member of the TBD Labs team replied to your inquiry.',
      title: 'A message from our team',
      content: `${paragraph(`Hello, ${escapeHtml(staffName)} from TBD Labs sent you a message:`)}<div style="padding:16px;background:#090b10;border:1px solid #272b38;border-radius:10px;color:#c5cad5;font:15px/1.7 Arial,sans-serif;overflow-wrap:anywhere;">${safeMessage}</div>`,
    }),
  };
}

function staffWelcomeTemplate({ name, email }) {
  return {
    subject: 'Your TBD Labs staff account',
    text: `Hello ${name},\n\nA staff account was created for ${email}. Contact the superadmin who created the account for sign-in instructions.\n\nTBD Labs`,
    html: emailLayout({
      preheader: 'A staff account was created for you.',
      title: 'Your staff account is ready',
      content: `${paragraph(`Hello ${escapeHtml(name)},`)}${paragraph(`A staff account was created for <strong style="color:#f3f4f6;">${escapeHtml(email)}</strong>. Contact the superadmin who created the account for sign-in instructions.`)}`,
      footer: 'TBD Labs · Staff account notification',
    }),
  };
}

module.exports = {
  clientConfirmationTemplate,
  staffInquiryTemplate,
  staffReplyTemplate,
  staffWelcomeTemplate,
};
