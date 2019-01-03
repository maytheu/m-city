import React from "react";

const FormField = ({ formData, id, change }) => {
  const renderTemplate = () => {
    let formTemplate = null;
    switch (formData.element) {
      case "input":
        return (formTemplate = (
          <div>
            <input
              {...formData.config}
              value={formData.value}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        ));
      default:
        return formTemplate;
    }
  };

  const showError = () => {
    let errorMessage = (
      <div className="error_label">
        {formData.validation && !formData.valid
          ? formData.validationMessage
          : null}
      </div>
    );
    return errorMessage;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
