// Remove Form functionality from index.js
const {
  colors,
  borders,
  palette,
  CssBseline,
  createTheme,
  ThemeProvider,
  Typography,
  Container,
  Box,
  SvgIcon,
  Link,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  Input,
  Button,
} = MaterialUI;

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#008b8b',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: colors.red.A400,
    },
  },
});

function App() {
  const [todos, setTodos] = React.useState([
    // {
    //   text: 'learn react',
    //   isCompleted: false,
    // },
    // {
    //   text: 'meet friend for lunch',
    //   isCompleted: false,
    // },
    // {
    //   text: 'build todo app',
    //   isCompleted: false,
    // },
  ]);

  const [value, setValue] = React.useState();
  // React Refference to handle and clear text box after submit
  const textInput = React.useRef(null);

  // const StartMessage = () => {
  //   if (todos.length === 0) {
  //     return (
  //       <Box
  //         sx={{
  //           pl: 1,
  //           my: 2,
  //         }}
  //       >You have no tasks to complete.</Box>
  //     );
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    const newTodos = [...todos, { text: value, isCompleted: false }];
    setTodos(newTodos);
    // setValue('');
    textInput.current.value = '';
  };

  // Remove a list item
  const removeTodo = (i) => {
    const index = Number(i);
    // Make temporary array of all the current todos
    let temp = [...todos];

    // Remove the item at index of "index" and remove only 1 item
    temp.splice(index, 1);

    // Use "setTodos" hook to update todos to be equaly to the temp array that was just modified
    setTodos(temp);
  };

  const toggleChecked = (i) => {
    const index = Number(i);
    let temp = [...todos];
    temp[i].isCompleted = !temp[i].isCompleted;
    setTodos(temp);
  }

  return (
    // App container
    <Box
      sx={{ width: 400, p: 2, bgcolor: 'primary.main', borderRadius: '10px' }}
    >
      {/* ToDo List Header */}
      <Typography
        variant='h2'
        component='div'
        sx={{ borderBottom: 1 }}
        gutterBottom
      >
        ToDo List
      </Typography>

      {/* ToDo List Container */}
      <Box sx={{ bgcolor: 'white', p: 1, borderRadius: '5px' }}>
        {/* ToDo List Items */}
        {todos.map((todo, i) => (
          <Box
            key={i}
            sx={{
              pl: 0.8,
              my: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.isCompleted}
                  onClick={() => toggleChecked(i)}
                  sx={{
                    '&.Mui-checked': {
                      '&, & + .MuiFormControlLabel-label': {
                        color: 'text.disabled',
                      },
                    },
                  }}
                />
              }
              label={todo.text}
              key={i}
            />
            {/* Remove Item Button */}
            <Button
              variant='outlined'
              size='small'
              color='error'
              sx={{ color: 'text.disabled', borderColor: 'text.disabled' }}
              onClick={() => removeTodo(i)}
            >
              X
            </Button>
            {/* <br /> */}
          </Box>
        ))}

        {/* Add New ToDo Item Input */}
        <Box
          component='form'
          sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}
          onSubmit={handleSubmit}
        >
          <TextField
            inputRef={textInput}
            label='New ToDo Item'
            variant='outlined'
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ width: 1 }}
          />
          <Button
            type='submit'
            variant='contained'
            size='large'
            sx={{ p: 1.8 }}
          >
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
