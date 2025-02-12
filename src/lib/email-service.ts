export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendEmail(data: EmailData) {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'ab31315f-e675-4a97-b668-eea965d189d9', // Replace with your Web3Forms access key
        ...data
      })
    });

    const result = await response.json();
    return { success: result.success };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}