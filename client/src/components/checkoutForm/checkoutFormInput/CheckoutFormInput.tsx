import { Field, ErrorMessage } from "formik";

interface CheckoutFormInputProps {
  inputTitle: string;
  name: string;
  type?: string;
  isErrorMessage?: boolean | string;
}

const CheckoutFormInput = ({
  inputTitle,
  name,
  type = "text",
  isErrorMessage,
}: CheckoutFormInputProps) => {
  return (
    <>
      <div className="checkoutInfoItem">
        <span className="checkoutInfoKey">{inputTitle}</span>
        <Field
          type={type}
          name={name}
          className={
            isErrorMessage ? "checkoutInfoValue error" : "checkoutInfoValue"
          }
        />
      </div>
      <ErrorMessage name={name} component="div" className="errorMessage"  />
    </>
  );
};

export default CheckoutFormInput;
