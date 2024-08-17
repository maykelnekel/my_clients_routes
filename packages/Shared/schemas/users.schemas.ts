import z from "zod";

export const userSchema = z.object({
  id: 
    z.string({
      required_error: "Você precisa informar o campo 'id'.",
      invalid_type_error: "Tipo inválido. Esperado 'String'."
    })
    .uuid({message: "Tipo inválido. Esperado 'UUID'."}),
  name: 
    z.string({
      required_error: "Você precisa informar o campo 'nome'.",
      invalid_type_error: "Tipo inválido. Esperado 'String'."
    })
    .max(120, {message: "O nome não pode ultrapassar 120 caracteres."}),
  email: 
    z.string({
      required_error: "Você precisa informar o campo 'email'.",
      invalid_type_error: "Tipo inválido. Esperado 'String'."
    })
    .max(120, {message: "O email não pode ultrapassar 120 caracteres."})
    .email({message: "Formato de email inválido."}),
  phone_number: 
    z.string({
      required_error: "Você precisa informar o campo 'telefone'.",
      invalid_type_error: "Tipo inválido. Esperado 'String'."
    })
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
      message: 
        "Formato inválido para o telefone. Precisa ser '(XX) XXXX-XXXX' ou '(XX) XXXXX-XXXX'."
    }),
  latitude: 
    z.number({
      required_error: "Você precisa informar o campo 'latitude'.",
      invalid_type_error: "Tipo inválido. Esperado 'String'."
    })
    .min(-90, {message: "Formato inválido para 'latitude'."})
    .max(90, {message: "Formato inválido para 'latitude'."}),
  longitude: 
    z.number({
      required_error: "Você precisa informar o campo 'longitude'.",
      invalid_type_error: "Tipo inválido. Esperado 'String'."
    })
    .min(-180, {message: "Formato inválido para 'longitude'."})
    .max(180, {message: "Formato inválido para 'longitude'."}),
});

export const userCreationSchema = userSchema.omit({
  id: true,
});

export const userUpdateSchema = userCreationSchema.partial({});
