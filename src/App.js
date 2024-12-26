import './App.css';
import PhonebookItem from './components/PhonebookItem';

const routes = routers([{
  path: '/',
  element: <PhonebookItem />,

},
{
  path: '/add',
  element: <AddPhonebook />,
}
]
)
export default App;
