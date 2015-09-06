(function(d3, fc) {
    'use strict';
    /**
     * An overload of the d3.rebind method which allows the source methods
     * to be rebound to the target with a different name. In the mappings object
     * keys represent the target method names and values represent the source
     * object names.
     */
    fc.util.rebind = function(target, source, mappings) {
        if (typeof(mappings) !== 'object') {
            return d3.rebind.apply(d3, arguments);
        }
        Object.keys(mappings)
            .forEach(function(targetName) {
                var method = source[mappings[targetName]];
                if (typeof method !== 'function') {
                    throw new Error('The method ' + mappings[targetName] + ' does not exist on the source object');
                }
                target[targetName] = function() {
                    var value = method.apply(source, arguments);
                    return value === source ? target : value;
                };
            });
        return target;
    };

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Rebinds multiple properties from the source component, adding the given prefix.
     */
    fc.util.rebindProperties = function(target, source, properties, prefix) {
        var bindings = {};
        properties.forEach(function(property) {
            bindings[prefix + capitalizeFirstLetter(property)] = property;
        });
        fc.util.rebind(target, source, bindings);
    };

}(d3, fc));
