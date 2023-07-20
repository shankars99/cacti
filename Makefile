# Define the name of the JavaScript script
JS_SCRIPT := check_env.js

# Define the target for running the JavaScript script
check_node_version:
	node $(JS_SCRIPT)

# Define the target for running `yarn run configure`
run_configure:
	yarn run configure

# Define the default target that runs both targets
all: check_node_version run_configure

.PHONY: check_node_version run_configure all
