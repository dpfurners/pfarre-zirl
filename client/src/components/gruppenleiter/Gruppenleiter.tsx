import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useToast } from "../../context/ToastProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserPen } from "@fortawesome/free-solid-svg-icons";
import NewGruppenleiter from "./NewGruppenleiter";

const Gruppenleiter = () => {
  const axiosPrivate = useAxiosPrivate();

  const { showError } = useToast();

  const [hoverAdd, setHoverAdd] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  interface UserResponse {
    id: number;
    username: string;
    roles: number[];
    first_name?: string;
    last_name?: string;
    mail: string;
    phone?: number;
    street?: string;
    address_number?: number;
    zip?: number;
    city?: string;
    birthday?: string;
  }

  const [gruppenleiter, setGruppenleiter] = useState<UserResponse[]>([]);

  useEffect(() => {
    const fetchGruppenleiter = async () => {
      try {
        const response = await axiosPrivate.get("/gruppenleiter");
        const data = response.data.map((user: UserResponse) => ({
          ...user,
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          phone: user.phone || "",
          street: user.street || "",
          address_number: user.address_number || "",
          zip: user.zip || "",
          city: user.city || "",
          birthday: user.birthday || "",
        }));
        data.sort((a, b) => Math.min(...a.roles) - Math.min(...b.roles));
        setGruppenleiter(data);
      } catch (error) {
        showError("Gruppenleiter", "Error fetching gruppenleiter");
      }
    };

    fetchGruppenleiter();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Gruppenleiter Liste</h2>
        <div
          className="d-flex justify-content-end mb-3"
          onMouseEnter={() => setHoverAdd(true)}
          onMouseLeave={() => setHoverAdd(false)}
        >
          <Button onClick={() => setShowNewModal(true)}>
            <FontAwesomeIcon icon={faPlus} beat={hoverAdd} />
          </Button>
        </div>
        {gruppenleiter.map((user) => (
          <Card key={user.id} className="mb-3" border="danger">
            <Card.Header>
              <div className="d-flex justify-content-between" as={Link}>
                <p>
                  <strong>
                    {user.first_name} {user.last_name}
                  </strong>{" "}
                  ({user.username})
                </p>
                <Button as={Link} to="/gruppenleiter/add">
                  <FontAwesomeIcon icon={faUserPen} />
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Roles:</strong> {user.roles.join(", ")} <br />
                <strong>Email:</strong> {user.mail} <br />
                {user.phone && (
                  <>
                    <strong>Phone:</strong> {user.phone} <br />
                  </>
                )}
                {user.street && user.address_number && (
                  <>
                    <strong>Address:</strong> {user.street}{" "}
                    {user.address_number}, {user.city}, {user.zip} <br />
                  </>
                )}
                {user.birthday && (
                  <>
                    <strong>Birthday:</strong> {user.birthday} <br />
                  </>
                )}
              </Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <NewGruppenleiter
        showModal={showNewModal}
        setShowModal={setShowNewModal}
      />
    </>
  );
};

export default Gruppenleiter;
