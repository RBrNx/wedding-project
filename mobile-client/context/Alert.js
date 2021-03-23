import React, { createContext, useContext, useState } from 'react';
import Alert from '../library/components/Alert';

const AlertContext = createContext();

const AlertProvider = ({ children, defaultPosition = 'top' }) => {
  const {
    isAlertVisible,
    message,
    type,
    title,
    position,
    breathingSpace,
    showAlert,
    dismissAlert,
  } = useAlertProvider();

  return (
    <>
      <AlertContext.Provider value={{ showAlert }}>{children}</AlertContext.Provider>
      <Alert
        message={message}
        title={title}
        type={type}
        dismissAlert={dismissAlert}
        isVisible={isAlertVisible}
        position={position || defaultPosition}
        breathingSpace={breathingSpace}
      />
    </>
  );
};

const useAlertProvider = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertTitle, setAlertTitle] = useState(null);
  const [alertPosition, setAlertPosition] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [alertBreathingSpace, setAlertBreathingSpace] = useState(null);

  const showAlert = ({ title, message, type, duration, position, breathingSpace }) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setAlertPosition(position);
    setAlertBreathingSpace(breathingSpace);
    setIsAlertVisible(true);

    setTimeout(() => dismissAlert(), duration || 5000);
  };

  const dismissAlert = () => {
    setIsAlertVisible(false);
  };

  return {
    isAlertVisible,
    message: alertMessage,
    title: alertTitle,
    type: alertType,
    position: alertPosition,
    breathingSpace: alertBreathingSpace,
    showAlert,
    dismissAlert,
  };
};

const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within a AlertProvider');
  }
  return context;
};

export { AlertProvider, useAlert };
