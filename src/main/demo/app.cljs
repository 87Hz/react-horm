(ns demo.app
  (:require ["react-dom" :refer (render)]
            ["react" :refer (useState createElement)]
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
    (createElement "div" nil
                   (createElement "button" #js {:onClick (fn [] (set-val! inc))} "+")
                   (createElement "button" #js {:onClick (fn [] (set-val! dec))} "-")
                   val)))

(defn demo []
  (createElement stateExample))

(defn ^:export mount []
  (render (demo) (.getElementById js/document "app")))

(defn ^:export main []
  (mount))