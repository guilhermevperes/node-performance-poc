
# Node Performance Poc

### The reason of this poc is to compare some ways to process a heavy amount of data (100K +) using Node JS. In this case we have two groups of data (posts and comments), and we need to match the comments with respectively posts, and then save the result in a csv file.
----
### Step 1: Install the dependencies:

```
npm i
```

### Step 2: Run the command bellow to start the mock server

```
node populate.js
```

### Step 3: In another terminal run the command bellow to execute the performance test

```
node index.js
```

