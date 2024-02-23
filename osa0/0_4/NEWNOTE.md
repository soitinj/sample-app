sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note

    Note over browser: payload: {"note": "example note"}

    activate server
    server-->>browser: 302 Found Response

    Note over server: Server adds the new note to its storage
    Note over server: Server retrieves redirect URI
    Note over server: Location: /example/notes
    deactivate server

    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes

    Note over browser: Fetch the redirect URI described by Location

    activate server
    server-->>browser: the HTML document
    deactivate server


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note over browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "new note", "date": "2023-1-1" }, ... ]
    deactivate server    

    Note over browser: The browser executes the callback function that renders the notes
    Note over browser, server: The content now includes the new note created by the user