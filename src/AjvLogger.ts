import betterAjvErrors from "better-ajv-errors";
import { HelpArgsSchema } from "./HelpArgsSchema";
import { isOptions } from "./IsOptions";
import ajv from "./TypeBoxAjv";

export const ajvConsoleLogger = (args: unknown, schema: unknown): void => {
    if (isOptions(args, HelpArgsSchema)) {        
        console.log(schema);
    } else {
        console.error(
            betterAjvErrors(
                schema,
                args,
                ajv.errors
            )
        );
    }
}
