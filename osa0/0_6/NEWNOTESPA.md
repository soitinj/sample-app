sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note over browser: payload: {"note": "example note"}

    activate server
    server-->>browser: 201 Created

    Note over server: Server adds the new note to its storage
    Note over server: Response: {"message":"note created"}
    deactivate server

    Note right of browser: The browser executes the callback function that adds (renders) the new note to existing notes
