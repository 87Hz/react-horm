(ns horm
  (:require ["react" :refer (createContext createElement useContext)]))

(def ^:export horm-context (createContext {:hz 123}))

(defn ^:export Horm [props children]
  (createElement horm-context.Provider nil children))