export const addCaseWithLoading = (
    builder,
    asyncAction,
    { onCompleted, onPending, onReject } = {},
  ) => {
    builder.addCase(asyncAction.pending, (state, action) => {
      if (state && state.isLoading !== undefined) {
        state.isLoading = true;
      }
      if (onPending) {
        onPending(state, action);
      }
    });
    builder.addCase(asyncAction.fulfilled, (state, action) => {
      if (onCompleted) {
        onCompleted(state, action);
      }
      if (state && state.isLoading !== undefined) {
        state.isLoading = false;
      }
    });
    builder.addCase(asyncAction.rejected, (state, action) => {
      if (onReject) {
        onReject(state, action);
      }
      if (state && state.isLoading !== undefined) {
        state.isLoading = false;
      }
    });
  };
  
  export function getFormValues(e) {
    const form = e.target;
    const formData = new FormData(form);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
  
    return formValues
  }