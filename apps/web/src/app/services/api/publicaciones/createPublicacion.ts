// /services/api/publicaciones/createPublicacion.ts
import axiosInstance from "@web/src/app/services/axiosInstance";

interface CreatePublicacionPayload {
  titulo: string;
  urlimagen?: string;
  descripcionSEO?: string;
  fechapublicacion?: Date;
  slug: string;
  richtext: string;
  id_tipopublicacion: number;
  id_usuario: string;
  categorias: string[];
  etiquetas: string[];
}

const createPublicacion = async (payload: any): Promise<Response> => {
  const response: Response = await axiosInstance.post("/publicaciones/crearPublicacion", payload);
  return response;
};

export default createPublicacion;