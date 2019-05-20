(ns demo.app
  (:require ["react" :as react]
            ["react-dom" :refer (render)]
            ["./bar" :refer (MyComponent) :default MyDefaultComponent]))


(defn root []
  (let [num-children 5
        children-props (clj->js (map hash-map
                                     (repeat num-children :key)
                                     (range num-children)))]
    (MyDefaultComponent #js {:children (mapv MyComponent children-props)})))

(defn ^:export mount-root []
  (render (root) (.getElementById js/document "app")))

(defn ^:export main []
  (js/console.log "app init" react MyComponent)
  (mount-root))