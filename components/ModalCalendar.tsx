// ModalCalendar.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface ModalCalendarProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, date: Date) => void;
}

const ModalCalendar: React.FC<ModalCalendarProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  // Muestra el selector de fecha
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Oculta el selector de fecha
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Se ejecuta al seleccionar una fecha
  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  // Envía los datos ingresados
  const handleSubmit = () => {
    if (name.trim() === "" || !date) {
      // Aquí podrías agregar validaciones o mostrar un error
      return;
    }
    onSubmit(name, date);
    // Opcional: reinicia los campos y cierra el modal
    setName("");
    setDate(null);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{`¿Cuándo fue la última vez que te hiciste una mamografía?`}</Text>

          {/* Input para el nombre */}
          {/* <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          /> */}

          {/* Botón para mostrar el selector de fecha */}
          <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
            <Text style={styles.dateText}>
              {date ? date.toLocaleDateString() : "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>

          {/* Selector de fecha */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {/* Botón para enviar */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>

          {/* Botón para cancelar */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCalendar;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Fondo semi-transparente
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    marginBottom: 15,
  },
  dateText: {
    color: "#555",
  },
  submitButton: {
    backgroundColor: "#ff4081",
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#ff4081",
    textAlign: "center",
  },
});
