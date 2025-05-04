## poznámky z linuxu

### android app -> polygonadnoird

install
```bash
npx expo install react-native-appwrite react-native-url-polyfill
```

inizialize
```js
import { Client, Account, ID } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint('http://192.168.1.143/v1')
    .setProject('68026040001fb73840da')
    .setPlatform('cz.kubmak.polygon');
```


### polygon web
```bash
npm install appwrite
```

```js
import { Client } from 'appwrite';

const client = new Client();
client
    .setEndpoint('http://192.168.1.143/v1')
    .setProject('68026040001fb73840da');
```
