export class HandleErrors {
  static execute(e: any) {
    if (e.name === "EntityValidationError") {
      return Response.json({ message: e.error }, { status: 400 });
    }
    if (e.name === "UnauthorizedError") {
      return Response.json({ message: e.message }, { status: 401 });
    }
    if (e.name === "NotFoundError") {
      return Response.json({ message: e.message }, { status: 404 });
    }

    return Response.json({ message: e.message }, { status: 500 });
  }
}

export class HandleExecute {
  static execute<T>(f): T | Response {
    try {
      return f;
    } catch (e) {
      return HandleErrors.execute(e);
    }
  }
}
