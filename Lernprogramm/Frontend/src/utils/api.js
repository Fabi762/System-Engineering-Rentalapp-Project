export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('http://localhost:3001/upload', {
    method: 'POST',
    body: formData,
  });

  return await res.json();
}
