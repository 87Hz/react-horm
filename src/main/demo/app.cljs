(ns demo.app
  (:require ["react-dom" :refer (render)]
            ["react" :refer (useState createContext useContext useEffect) :rename {createElement e}]
            ["./bar" :refer (MyComponent) :default MyDefaultComponent]
            [horm :as horm]))

(defn root []
  (let [num-children 5
        children-props (clj->js (map hash-map
                                     (repeat num-children :key)
                                     (range num-children)))]
    (MyDefaultComponent #js {:children (mapv MyComponent children-props)})))

(def ctx (createContext 0))

(defn stateExample []
  (let [ctx-val (useContext ctx)
        [val set-val!] (useState ctx-val)]
    (useEffect
      (fn []
        (prn 123)
        js/undefined)
      [])
    (e "div" nil
      (e "button" #js {:onClick (fn [] (set-val! inc))} "+")
      (e "button" #js {:onClick (fn [] (set-val! dec))} "-")
      val)))

(defn demo []
  (e ctx.Provider #js {:value 100}
    (e stateExample)))

(defn ^:export mount []
  (render (root) (.getElementById js/document "app")))

(defn ^:export main []
  (mount))