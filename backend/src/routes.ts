import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateNutritionController } from "./controllers/CreateNutritionController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      '```json\n{\n  "nome": "Eduardo",\n  "sexo": "Masculino",\n  "idade": 43,\n  "altura": 1.70,\n  "peso": 85,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "07:00",\n      "nome": "Cafe da manha",\n      "alimentos": [\n        "4 ovos inteiros",\n        "1 xicara de aveia",\n        "1 banana",\n        "1 colher de sopa de pasta de amendoim"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da manha",\n      "alimentos": [\n        "1 iogurte natural",\n        "30g de whey protein",\n        "1 punhado de castanhas"\n      ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoco",\n      "alimentos": [\n        "200g de frango grelhado",\n        "1 xicara de arroz integral",\n        "1 concha de feijao",\n        "Salada verde a vontade (alface, tomate, pepino)"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "nome": "Pre treino",\n      "alimentos": [\n        "2 fatias de pao integral",\n        "100g de peito de peru",\n        "1 laranja"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Pos treino",\n      "alimentos": [\n        "30g de whey protein",\n        "5g de creatina",\n        "1 xicara de batata doce"\n      ]\n    },\n    {\n      "horario": "22:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "200g de carne vermelha magra",\n        "1 xicara de brocolis cozido",\n        "1 fio de azeite de oliva"\n      ]\n    }\n  ],\n       "suplementos":[\n            "Creatina",\n            "Whey Protein"\n        ]\n}\n```';

    try {
      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();
      let jsonObject = JSON.parse(jsonString);
      return reply.send({ data: jsonObject });
    } catch (error) {
      console.error(error);
    }
    reply.send({ ok: true });
  });
  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply);
    }
  );
}
