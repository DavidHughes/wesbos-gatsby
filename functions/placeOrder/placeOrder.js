const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your pizza is on its way!</h2>
  <p>Sit tight, your pizza will be with you soon!</p>
  <ul>
  ${order
    .map(
      (item) => `<li>
  <img src=${item.thumbnail} alt=${item.name} />
  ${item.size} ${item.name} - ${item.price}
  </li>`
    )
    .join('')}
  </ul>
  <p>Your total is ${total}</p>
  </div>`;
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);
  const requiredFields = ['name', 'email', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops, missing required field "${field}"`,
        }),
      };
    }
  }

  // create a transport for nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Test send an email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>`,
    subject: 'New Order!',
    html: generateOrderEmail({
      order: body.order,
      total: body.total,
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
