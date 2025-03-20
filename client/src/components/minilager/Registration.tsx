import { useTitle } from "../../context/TitleProvider";
import { useEffect } from "react";
import {
  Form,
  Container,
} from "react-bootstrap";
import { useToast } from "../../context/ToastProvider";
import axios from "../../api/axios";
import FullName from "../forms/FullName";
import Address from "../forms/Address";
import PhoneMail from "../forms/PhoneMail";
import MyForm from "../forms/MyForm";
import Birthday from "../forms/Birthday";
import Select from "../forms/Select";
import Additional from "../forms/Additional";

const FIELDS = [
  "firstName",
  "lastName",
  "street",
  "addressNumber",
  "zip",
  "city",
  "phone",
  "mail",
  "birthday",
  "parentType",
  "parentfirstName",
  "parentlastName",
  "allergies",
  "roomRequest",
  "additionalInfo",
  "otherParentType",
];

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "street",
  "addressNumber",
  "zip",
  "city",
  "phone",
  "mail",
  "birthday",
  "parentType",
  "parentfirstName",
  "parentlastName",
];

const Registration = () => {
  const { showSuccess, showError } = useToast();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Anmeldung");
  }, [setTitle]);

  const handleSubmit = (formData: Record<string, string>): void => {
    if (formData.parentType === "other") {
      formData.parentType = formData.otherParentType;
    }

    axios
      .post("/minilager/create_kid", formData)
      .then(() => {
        showSuccess(
          "Anmeldung erfolgreich",
          "Ihre Anmeldung wurde erfolgreich übermittelt"
        );
      })
      .catch(() => {
        showError(
          "Anmeldung fehlgeschlagen",
          "Ihre Anmeldung konnte nicht übermittelt werden"
        );
      });
  };

  return (
    <Container className="mt-5">
      <MyForm
        onSubmit={handleSubmit}
        formDataName="formData"
        fields={FIELDS}
        requiredFields={REQUIRED_FIELDS}
      >
        <Form.Label htmlFor="basic-url">Daten des Kindes</Form.Label>
        <FullName />
        <Address />
        <Birthday />
        <Form.Label htmlFor="basic-url">
          Daten des Erziehungsberechtigten
        </Form.Label>
        <Select />
        <FullName prefix="parent" prefixName="Eltern" />
        <Form.Label htmlFor="basic-url">Kontaktdaten</Form.Label>
        <PhoneMail />
        {/* <Additional
          fields={["allergies", "roomRequest", "additionalInfo"]}
          labels={["Allergien", "Raum Wuensche", "Sonsitges"]}
        /> */}
      </MyForm>
    </Container>
  );
};

export default Registration;
