
type FormRequest<keyType extends Readonly<string[]>> = {[p in keyType[number]]: string};

export function formHelper<PropType extends Readonly<string[]>>(data: FormData, props: PropType) {
  const result =  props.reduce((prev, key) => {
    const newValue = {[key]: data.get(key) as string};
    return {...prev, ...newValue} as const;
  }, {});
  return {...result} as FormRequest<PropType>;
}