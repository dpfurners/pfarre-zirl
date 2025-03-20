import { Form, Modal } from "react-bootstrap";
import FullName from "../forms/FullName";
import Address from "../forms/Address";
import PhoneMail from "../forms/PhoneMail";
import MyForm from "../forms/MyForm";
import Birthday from "../forms/Birthday";
import Additional from "../forms/Additional";

interface NewGruppenleiterProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

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
  "additionalInfo",
];

const REQUIRED_FIELDS = ["firstName", "lastName", "phone"];

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  street: "",
  addressNumber: "",
  zip: "",
  city: "",
  phone: "",
  mail: "",
  birthday: "",
  additionalInfo: "",
};

const NewGruppenleiter = ({
  showModal,
  setShowModal,
}: NewGruppenleiterProps) => {

  const onSubmit = (data: any) => {
    console.log("New Gruppenleiter", data);
    setShowModal(false);

  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Erstelle einen neuen Gruppenleiter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MyForm
          formDataName="newGruppenleiterForm"
          fields={FIELDS}
          requiredFields={REQUIRED_FIELDS}
          initialData={INITIAL_DATA}
          onSubmit={onSubmit}
        >
          <FullName />
          <Form.Label>Addresse</Form.Label>
          <Address />
          <Birthday />
          <Form.Label>Kontaktinformationen</Form.Label>
          <PhoneMail />
          {/* <Additional
            fields={["additionalInfo"]}
            labels={["Sonstige Informationen"]}
            indformation="Zusätzliche Informationen"
          /> */}
        </MyForm>
      </Modal.Body>
    </Modal>
  );
};

export default NewGruppenleiter;
