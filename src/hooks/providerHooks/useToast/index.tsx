import Toast from 'react-native-toast-message';

export default function useToast() {
  function showError(message: string) {
    console.log(message);
    Toast.show({
      text1: message,
      type: 'error',
      visibilityTime: 3000,
    });
  }

  function showSuccess(message: string) {
    Toast.show({
      text1: message,
      type: 'success',
      visibilityTime: 3000,
    });
  }

  return {showError, showSuccess};
}
