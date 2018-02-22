const on = (target, event, handler) => {
    return target.addEventListener(event, handler);
  };

const el = (id) => document.getElementById(id);
  
  export { on, el };