module.exports = {
  apps : [{
  	name: 'blog',
    script: './server.js',
    instances: 1,
    max_restarts: 7,
    env: {
      NODE_ENV: 'development', // production
    },
    watch:[
        "server",
    ],
    merge_logs: true,
    exec_mode: 'cluster',
    max_memory_restart: '600M',
    instance_var: 'NODE_APP_INSTANCE'
  }]
};
