# dv01

### Start Steps
1. Clone the repo
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000/` in your browser

### Notes
Below are some notes on the project. I've also included some notes in the code itself.
- React: 
  - I went to use a new template from Vite to use typescript, but I ran into issues with `papaparse`. I decided then to stick to the template given.
  - I used hooks instead of class components. I have more experience with hooks and prefer them.
- Data Fetching:
  - Especially recently, I have preferred to use Tanstack Query for data fetching. It offers great OOB features, but seemed a little overkill for this project and there is no external fetch. To mock the fetch, and Tanstack Query, I abstraced my getter into a custom hook. This hook is used in the `App` component to fetch the data and pass it down to child components.
- State Management:
  - I only used local state in this example. It is comfortbale for me and works well in small or large projects.
  - If Global State Management was needed: Tanstack Query is able to manage global state as it relates to fetching. My goto global state management library is the Context API, but I have experience in Redux Toolkit as well. Instead of local state with useState, being used, I could have used either Context or Redux to accomplish this.
  - Another state management tool to use could have been the url bar. This is useful for usecases of filtering data so users can share links with each other. I have used this in the past with great success. Due to the nature of this project, I did not use it.
- Styling:
  - I used CSS modules for styling. It's an easy way for keeping css scope small and manageable. I try to use css modules or even tailwind especially when working with Next.js for it's build time optimizations.
- Routing:
  - I did not implement a router. It seems unnecesary for this project. If it were to be implemented, it begins to make sense for some global state management. I would have used React Router for this in a client side rendered app.
