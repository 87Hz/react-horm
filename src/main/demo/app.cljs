(ns demo.app
  (:require ["react-dom" :refer (render)]
            ["react" :refer (createElement useContext useState)]
            [sablono.core :as html :refer-macros [html]]
            ; ["./bar" :refer (MyComponent) :default MyDefaultComponent]
            [horm :as horm]))

; (defn root []
;   (let [num-children 5
;         children-props (clj->js (map hash-map
;                                      (repeat num-children :key)
;                                      (range num-children)))]
;     (MyDefaultComponent #js {:children (mapv MyComponent children-props)})))

(defn stateExample []
  (let [[val set-val!] (useState 200)]
    (html [:div [:button {:onClick (fn [] (set-val! inc))} "+"]
                [:button {:onClick (fn [] (set-val! dec))} "-"]
                val])))

(defn demo []
  (html [:div {}
          ^:inline (stateExample)))

(defn ^:export mount []
  (render (demo) (.getElementById js/document "app")))

(defn ^:export main []
  (js/console.log "app init" horm/Horm)
  (mount))