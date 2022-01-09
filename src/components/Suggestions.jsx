import React from "react";
import Form from "react-bootstrap/Form";

export default function Suggestions(props) {
  const { submit } = props;
  return (
    <Form.Group className="suggestions">
      {!submit && (
        <Form.Text className="text-muted">
          Some suggestions:
          <ul>
            <li>Check spelling of all words</li>
            <li>Try different words that mean the same thing</li>
            <li>Enter fewer words</li>
          </ul>
        </Form.Text>
      )}
    </Form.Group>
  );
}
