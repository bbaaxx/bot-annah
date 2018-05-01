import rp from 'request-promise-native';
import {
  basicTextReply,
  randomBasicFromArray as pickFrom,
} from '../../actions';

const { OBJECT_ANALYSIS_ENDPOINT } = process.env;

const noImageResponses = [
  `Uhmm, no veo nada`,
  `Puedes intentar subiendo una imagen`,
  `Erhmmm, solo veo el texto de tu mensaje`,
];

export default async ctx => {
  const { attachments } = ctx.getMessage();
  const imageUrl = attachments.first();

  if (typeof imageUrl === 'undefined') return pickFrom(noImageResponses);

  const iaResult = await rp(OBJECT_ANALYSIS_ENDPOINT, {
    qs: { imageUrl: imageUrl.url },
    json: true,
  });

  const reply = Array.isArray(iaResult)
    ? `Me parece que es un o una ... ${iaResult[0].class} o ${
        iaResult[1].class
      }, o ${iaResult[2].class}`
    : 'No, no, la verdad no doy ... intenta con otra imagen';

  return basicTextReply(reply);
};
