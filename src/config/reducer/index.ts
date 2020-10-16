const defaultState = {
  user: null,
};

export default function reducer(
  state = defaultState,
  { type, payload }: { type: string; payload: any }
): any {
  switch (type) {
    case "SET_USER_STATE":
      return {
        ...state,
        user: {
          ...payload,
          username: payload.email.split("@").shift(),
        },
      };
  }

  return state;
}
