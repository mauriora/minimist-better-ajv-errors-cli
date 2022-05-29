import { Type } from '@sinclair/typebox';


export const HelpArgsSchema = Type.Object(
    {
        _: Type.Optional(Type.Array(
            Type.String(),
            {
                maxItems: 0
            }
        )),

        help: Type.Boolean({ description: 'show available options' }),
    },
    {
        additionalProperties: true
    }
);