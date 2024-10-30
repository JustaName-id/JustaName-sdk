[**@justweb3/ui**](../README.md) • **Docs**

***

[@justweb3/ui](../globals.md) / Form

# Function: Form()

> **Form**\<`TFieldValues`, `TContext`, `TTransformedValues`\>(`props`): `Element`

A provider component that propagates the `useForm` methods to all children components via [React Context](https://reactjs.org/docs/context.html) API. To be used with useFormContext.

## Type Parameters

• **TFieldValues** *extends* `FieldValues`

• **TContext** = `any`

• **TTransformedValues** *extends* `undefined` \| `FieldValues` = `undefined`

## Parameters

• **props**: `FormProviderProps`\<`TFieldValues`, `TContext`, `TTransformedValues`\>

all useForm methods

## Returns

`Element`

## Remarks

[API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)

## Example

```tsx
function App() {
  const methods = useForm();
  const onSubmit = data => console.log(data);

  return (
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInput />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

 function NestedInput() {
  const { register } = useFormContext(); // retrieve all hook methods
  return <input {...register("test")} />;
}
```

## Defined in

[packages/@justweb3/ui/src/lib/ui/Form/index.tsx:14](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/ui/src/lib/ui/Form/index.tsx#L14)
