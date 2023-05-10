import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <>
      <div className="d-flex mx-auto my-1">
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>{" "}
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    </>
  );
}

export default Loading;
