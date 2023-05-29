import useFirebase from './firebase/useFirebase'

export default function App() {
  const { userState } = useFirebase()
  console.log(userState)
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>
}
