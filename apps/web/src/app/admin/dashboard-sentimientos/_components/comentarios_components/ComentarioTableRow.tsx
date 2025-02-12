import { Button } from '@repo/ui/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Comentario, Sentimiento } from '@web/types';
import { formatDate } from '@web/utils/date';
import { Delete, Ellipsis, FilePenLine } from 'lucide-react';
import React from 'react'

export const ComentarioTableRow = ({
  _comentario,
  setComentarios,
  sentimientoName,
  openEditSheet,
  updateSentimiento,
  sentimientos,
  setDelComentario,
  setDeleteModalOpen
}:{
  _comentario: Comentario;
  setComentarios: (comentario: Comentario) => void;
  sentimientoName: string;
  openEditSheet: (comentario: Comentario) => void;
  updateSentimiento: (newComentario: Comentario) => void;
  sentimientos: Sentimiento[];
  setDelComentario: (comentario: Comentario) => void;
  setDeleteModalOpen: (open: boolean) => void;
}) => {
  const {id, comentario, estadoaprobacion, fechacreacion, id_publicacion, usuario, id_sentimiento} = _comentario;

  const handleSentimientoChange = (newSentimientoId: string) => {
    const newSentimientoIdNumber = parseInt(newSentimientoId);
    setComentarios({..._comentario, id_sentimiento: newSentimientoIdNumber});
    updateSentimiento({..._comentario, id_sentimiento: newSentimientoIdNumber});
  };

  return (
    <>
      <section key={id} className="flex items-center gap-3 rounded-md border px-4 py-3">
        <div className="flex-1 text-sm">
          <p>{usuario.nombre + " " + usuario.apellido}</p>
        </div>

        <div className="flex-1 text-sm">
          <p>{comentario || "Comentario vacío"}</p>
        </div>

        <div className="flex-1">
          <Select 
            value={id_sentimiento?.toString()} 
            onValueChange={handleSentimientoChange}
          >
            <SelectTrigger
              className={`
                min-w-[30px] max-w-[180px] 
                text-xs md:text-base 
                flex items-center gap-2 
                ${id_sentimiento ? '' : 'bg-white text-black'}
              `}
              style={id_sentimiento ? {
                backgroundColor: sentimientos.find((s) => s.id.toString() === id_sentimiento.toString())?.colorfondo,
                color: sentimientos.find((s) => s.id.toString() === id_sentimiento.toString())?.colortexto,
              } : undefined}
            >
              <SelectValue 
                placeholder={sentimientoName || "Selecciona un sentimiento"} 
                className="flex items-center gap-2"
              />
            </SelectTrigger>

            <SelectContent>
              {sentimientos.map((sentimiento) => (
                <SelectItem
                  key={sentimiento.id}
                  value={sentimiento.id.toString()}
                  className="flex items-center gap- text-xs md:text-base hover:cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full p-1 rounded"
                    style={{
                      backgroundColor: sentimiento.colorfondo,
                      color: sentimiento.colortexto,
                    }}>
                    <span
                      className="h-4 w-4 rounded-full border flex-shrink-0"
                      style={{
                        backgroundColor: sentimiento.colortexto,
                      }}
                    />
                    <span>{sentimiento.nombre}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 text-sm">
          <p>{formatDate(fechacreacion.toString())}</p>
        </div>

        <Popover>
          <PopoverTrigger>
            <Ellipsis/>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-0 p-1" side="left" align="start">
            <Button variant={"ghost"} className="justify-start" onClick={() => openEditSheet(_comentario)}>
              <FilePenLine className="h-4 w-4" />
              <p>Editar</p>
            </Button>
            <Button
              variant={"ghost"}
              className="justify-start hover:bg-red-100/50"
              onClick={() => {
                setDelComentario(_comentario);
                setDeleteModalOpen(true);
              }}
            >
              <Delete className="h-4 w-4 stroke-red-500" />
              <p className="text-red-500">Eliminar</p>
            </Button>
          </PopoverContent>
        </Popover>
        
      </section>
    </>
  )
}

export default ComentarioTableRow;