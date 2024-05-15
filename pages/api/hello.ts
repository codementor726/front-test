// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from 'yup';

enum AgeGroup {
  Adult = "adult",
  Child = "child",
  Infant = "infant"
}

type FormData = {
  firstName: string;
  email: string;
  ageGroup: AgeGroup;
  address: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required(),
  email: yup.string().email().required(),
  ageGroup: yup.string().oneOf(Object.values(AgeGroup)).required(),
  address: yup.string()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data: FormData = req.body;
    await schema.validate(data);
    // For demonstration, simulate a successful response
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    console.error('Server Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}