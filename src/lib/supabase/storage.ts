import { createAdminClient } from "./admin";

const BUCKET = "relatorios";

export async function uploadPdf(
  diagnosticoId: string,
  pdfBuffer: Buffer
): Promise<string> {
  const supabase = createAdminClient();
  const path = `${diagnosticoId}.pdf`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, pdfBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    throw new Error(`Erro ao fazer upload do PDF: ${error.message}`);
  }

  return path;
}

export async function gerarUrlAssinada(
  diagnosticoId: string,
  expiresIn = 3600
): Promise<string> {
  const supabase = createAdminClient();
  const path = `${diagnosticoId}.pdf`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw new Error(`Erro ao gerar URL assinada: ${error.message}`);
  }

  return data.signedUrl;
}
