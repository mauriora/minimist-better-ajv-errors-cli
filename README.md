# minimist-better-ajv-errors-cli

Combines minimist, typebox, ajv and better-ajv-errors for simple command line args validating.

## Usage

Add to your project

```shell
   yarn add @mauriora/minimist-better-ajv-errors-cli @sinclair/typebox
```

If the `--help` option is used, the schema is shown as help :-)

Declare your schema, validate and either show errors or perform your task.

example.ts:

```typescript
    import { Static, Type } from '@sinclair/typebox';
    import { ajvConsoleLogger, getArgs, isOptions } from '@mauriora/minimist-better-ajv-errors-cli';

    const ArgsSchema = Type.Object(
        {
            bundle: Type.Optional(Type.Boolean({
                default: true,
                description: 'if set and false then bundle task will be skipped'
            })),
            ship: Type.Optional(Type.Boolean({
                description: 'if not set then a debug version is build'
            })),

            _: Type.Optional(Type.Array(
                Type.String(),
                {
                    maxItems: 0
                }
            )),

            color: Type.Optional(Type.Boolean({ description: 'Ignored' })),
        },
        {
            additionalProperties: false
        }
    );

    type Args = Static<typeof ArgsSchema>;

    const buildPackage = async ({ bundle, ship }: Args): Promise<boolean> => {
        // YOUR ACTION CODE        
    }

    const main = async (): Promise<boolean> => {
        const args: Args = getArgs();

        if (! isOptions(args, ArgsSchema)) {
            ajvConsoleLogger(args, ArgsSchema);
            return false;
        }
        return buildPackage(args);
    };

    main()
        .then(result => {
            if (result) {
                exit(0);
            } else {
                exit(1);
            }
        });

```

call your script:

```shell
   > example.ts --ship
```

```shell
   > example.ts --help
{
    bundle: {
      default: true,
      description: 'if set and false then bundle task will be skipped',
      kind: Symbol(BooleanKind),
      type: 'boolean',
      modifier: Symbol(OptionalModifier)
    },
    ship: {
      description: 'if not set then a debug version is build',
      kind: Symbol(BooleanKind),
      type: 'boolean',
      modifier: Symbol(OptionalModifier)
    },
    _: {
      maxItems: 0,
      kind: Symbol(ArrayKind),
      type: 'array',
      items: [Object],
      modifier: Symbol(OptionalModifier)
    },
    color: {
      description: 'Ignored',
      kind: Symbol(BooleanKind),
      type: 'boolean',
      modifier: Symbol(OptionalModifier)
    }
  }
}

```
