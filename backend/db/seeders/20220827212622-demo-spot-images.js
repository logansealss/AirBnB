'use strict';

const spotImages = 
[
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1637052320795-f4127085b5b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxTMDZHMzBNLVBoY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1560806981-44bbc2c6708c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxTMDZHMzBNLVBoY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1583135630256-a25ea659d1d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xTMDZHMzBNLVBoY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1585264550248-1778be3b6368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3xTMDZHMzBNLVBoY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1600047509782-20d39509f26d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=701&q=80',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1616486701797-0f33f61038ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1571508601793-abb5eb1eeb50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1618221520382-3d68e64f58ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjR8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1590912550141-1448da2bd5da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHxhUk9zQ3pQM1F0b3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1611048268428-c7dddc465ee7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1612152668323-b7f49335ebde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTh8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1535230387253-9cd5be991a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzJ8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1600489000300-e590b381ce48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzR8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=692&q=80',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzZ8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1581404554128-5032fe7874be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mzd8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzN8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDR8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1559329145-afaf18e3f349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1618222499121-d6528f6d9d77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDd8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1609234841642-6008b93ab310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwtcXlLMW1ZLW5xc3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=300&q=60',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1611216212569-d739dbe9ed40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8LXF5SzFtWS1ucXN8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1616593918824-4fef16054381?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8LXF5SzFtWS1ucXN8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1594348352384-97fa22a08109?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1618222155830-fcacd23874e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/flagged/photo-1570737231926-4d67558ff216?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=862&q=80',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1537301636683-5ac98e0466a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1552242718-c5360894aecd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1584752242818-b4bd7fb3fe10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1595678816704-9c82fbe792ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1030&q=80',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1595715316313-1730ee539c64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1614438789003-a6dfd3090c77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1628797285815-453c1d0d21e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1603283297623-f44d1dde80e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1603283297903-81277ca7ce8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1606011082438-5e55fea65538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1605886290933-7ed7b3240d4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1608045742930-48cee6018255?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=646&q=80',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1628602813485-4e8b09442e98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1628602813647-c70518049674?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1600210491741-a69593e43133?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },    {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1593006776550-a4897f8527b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1600210491188-be549f084855?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1600489000360-34bd69182634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1584069793904-574c37c3316f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1567428485548-c499e4931c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1600214859516-98999dba7cf1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1600489000300-e590b381ce48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1628797292362-1f382b2f4b5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1598654797939-407635ee99b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1600488999806-8efb986d87b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1616537937163-387d3f079de8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1617850687405-a18454436d77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1596552183299-000ef779e88d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1600493504091-8fb1555d2e14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1600493504483-8df7098b5792?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },    
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1613685302226-a4b6e15cf75d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },    
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1579283111514-ecb6229ee528?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    preview: false
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    preview: true
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1568605115459-4b731184f961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    preview: false
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1600493505500-afac3fc363e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1600493505371-f2f6153dbb29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1600494448655-ae58f58bb945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    preview: false
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
    preview: true
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1600494448868-9fbd1ac2d9f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    preview: false
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    preview: false
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1599083549933-838ea352c1cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    preview: false
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('SpotImages', spotImages);
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('SpotImages', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35] }
    }, {});
  }
};
