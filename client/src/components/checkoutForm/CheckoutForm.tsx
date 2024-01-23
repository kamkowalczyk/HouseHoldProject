import { Formik } from "formik";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import CheckoutFormInput from "./checkoutFormInput/CheckoutFormInput";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface CheckoutFormProps {
  setUserDataIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutForm = ({ setUserDataIsCorrect }: CheckoutFormProps) => {
  const { state } = useContext(AuthContext);
  const user = state.user;
  
  const schema = Yup.object().shape({
    forename: Yup.string().required("Pole wymagane").max(30, "Za długie"),
    surname: Yup.string().required("Pole wymagane").max(30, "Za długie"),
    email: Yup.string()
      .required("Pole wymagane")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Niepoprawny email"),
    phone: Yup.string()
      .required("Pole wymagane")
      .max(15, "Za długie")
      .matches(/^\d{9}$/, "Niepoprawny numer telefonu"),
    street: Yup.string().required("Pole wymagane"),
    city: Yup.string().required("Pole wymagane").max(30, "Za długie"),
    postalCode: Yup.string()
      .required("Pole wymagane")
      .matches(/^\d{2}-\d{3}$/, "Niepoprawny kod pocztowy ex. 00-000"),
  });

  const detectPrefiledInputs = (initialValues: any) => {
    const prefiledInputs = Object.keys(initialValues).filter(
      (key) => initialValues[key] !== ""
    );
    return prefiledInputs;
  };


  return (
    <Formik
      initialValues={{
        forename: user?.forename || '',
        surname:  user?.surname || '',
        email:  user?.email || '',
        phone:  user?.phone || '',
        street: "",
        city:  user?.city ||  '',
        country: user?.country || '',
        postalCode: "",
      }}
      validationSchema={schema}
      onSubmit={() => {
        setUserDataIsCorrect(true);
      }}
    >
      {({ errors, touched, isValid, values, setFieldTouched, validateForm }) => {

        const notPrefiledInputs = detectPrefiledInputs(values);
        useEffect(() => {
            for (const key of notPrefiledInputs) {
                setFieldTouched(key, true, false)
            }
            validateForm();
        }, 
        [setFieldTouched]);

        useEffect(() => {
          if (isValid && Object.keys(touched).length === Object.keys(values).length) {
            setUserDataIsCorrect(true);
          } else {
            setUserDataIsCorrect(false);
          }
        }, [isValid, touched, values, setUserDataIsCorrect]);

        return (
          <form>
            <div className="checkoutInfo">
              <h3 className="checkoutInfoTitle"><FontAwesomeIcon icon={faUser} className="icon" />Twoje dane</h3>
              <div className="checkoutInfoWrapper">
                <CheckoutFormInput
                  inputTitle="Imię:"
                  name="forename"
                  isErrorMessage={errors.forename && touched.forename}
                />
                <CheckoutFormInput
                  inputTitle="Nazwisko:"
                  name="surname"
                  isErrorMessage={errors.surname && touched.surname}
                />
                <CheckoutFormInput
                  inputTitle="Email:"
                  name="email"
                  isErrorMessage={errors.email && touched.email}
                />
                <CheckoutFormInput
                  inputTitle="Telefon:"
                  name="phone"
                  isErrorMessage={errors.phone && touched.phone}
                />
                <CheckoutFormInput
                  inputTitle="Ulica:"
                  name="street"
                  isErrorMessage={errors.street && touched.street}
                />
                <CheckoutFormInput
                  inputTitle="Miasto:"
                  name="city"
                  isErrorMessage={errors.city && touched.city}
                />
                <CheckoutFormInput
                  inputTitle="Kod pocztowy:"
                  name="postalCode"
                  isErrorMessage={errors.postalCode && touched.postalCode}
                />
                <CheckoutFormInput
                  inputTitle="Kraj:"
                  name="country"
                  isErrorMessage={errors.country && touched.country}
                />
              </div>
              {isValid &&
              Object.keys(touched).length === Object.keys(values).length ? (
                <div className="checkoutInfoItem">
                  <span style={{color: 'green'}} className="checkoutInfoKey p-10">
                    Wszystkie dane są poprawne
                  </span>
                </div>
              ) : (
                <div className="checkoutInfoItem">
                  <span style={{color: 'red'}} className="checkoutInfoKey p-10">
                    Wypełnij wszystkie pola
                  </span>
                </div>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default CheckoutForm;
