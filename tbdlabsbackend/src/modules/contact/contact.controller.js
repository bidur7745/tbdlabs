const contactService = require('./contact.service');

async function submit(req, res) {
  const result = await contactService.createContactInquiry(req.validatedBody);
  res.status(201).json({
    data: {
      inquiryId: result.id,
      message: 'Your inquiry has been received.',
    },
  });
}

module.exports = { submit };
