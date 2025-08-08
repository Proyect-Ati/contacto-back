import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Contacts } from "../entities/Contact";
import { apiResponse } from "../utils/apiResponse";

export default class ContactController {
  private readonly contactRepository = AppDataSource.getRepository(Contacts);

  async getAllContacts(req: Request, res: Response): Promise<Response> {
    try {
      const contacts = await this.contactRepository.find({
        order: { name: "ASC" },
      });
      return apiResponse(
        res,
        200,
        contacts,
        "Contactos obtenidos exitosamente"
      );
    } catch (error) {
      return apiResponse(
        res,
        500,
        null,
        error instanceof Error ? error.message : "Error al obtener contactos"
      );
    }
  }

  async getContactById(req: Request, res: Response): Promise<Response> {
    try {
      const contact = await this.contactRepository.findOneBy({
        id: parseInt(req.params.id),
      });

      if (!contact) {
        return apiResponse(res, 404, null, "Contacto no encontrado");
      }

      return apiResponse(res, 200, contact, "Contacto obtenido exitosamente");
    } catch (error) {
      return apiResponse(
        res,
        500,
        null,
        error instanceof Error ? error.message : "Error al obtener contacto"
      );
    }
  }

  async createContact(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone } = req.body;
      const contact = new Contacts();
      contact.name = name;
      contact.email = email;
      contact.phone = phone;

      const savedContact = await this.contactRepository.save(contact);
      return apiResponse(
        res,
        201,
        savedContact,
        "Contacto creado exitosamente"
      );
    } catch (error) {
      return apiResponse(
        res,
        500,
        null,
        error instanceof Error ? error.message : "Error al crear contacto"
      );
    }
  }

  async updateContact(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone } = req.body;
      const contact = await this.contactRepository.findOneBy({
        id: parseInt(req.params.id),
      });

      if (!contact) {
        return apiResponse(res, 404, null, "Contacto no encontrado");
      }

      if (name) contact.name = name;
      if (email) contact.email = email;
      if (phone) contact.phone = phone;

      const updatedContact = await this.contactRepository.save(contact);
      return apiResponse(
        res,
        200,
        updatedContact,
        "Contacto actualizado exitosamente"
      );
    } catch (error) {
      return apiResponse(
        res,
        500,
        null,
        error instanceof Error ? error.message : "Error al actualizar contacto"
      );
    }
  }

  async deleteContact(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.contactRepository.delete(
        parseInt(req.params.id)
      );

      if (result.affected === 0) {
        return apiResponse(res, 404, null, "Contacto no encontrado");
      }

      return apiResponse(res, 200, null, "Contacto eliminado exitosamente");
    } catch (error) {
      return apiResponse(
        res,
        500,
        null,
        error instanceof Error ? error.message : "Error al eliminar contacto"
      );
    }
  }
}
