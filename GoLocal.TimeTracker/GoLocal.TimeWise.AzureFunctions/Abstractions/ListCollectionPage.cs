// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using Microsoft.Graph;

namespace GoLocal.TimeWise.AzureFunctions.Abstractions
{
    public class ListCollectionPage<T> : IListCollectionPage<T>
    {
        public ListCollectionPage()
        {
            this.DataList = new List<T>();
            this.SiteList = new SiteList();
        }

        public IList<T> DataList { get; set; }

        public SiteList SiteList { get; set; }

        public string QueryDate { get; set; }

        public string SearchQuery { get; set; }

        public string SkipToken { get; set; }

        public int CurrentPageIndex { get; set; }

        public int PageSize { get; set; }

        public string ObjectIdentifier { get; set; }


        //#region IList implementation

        //public int IndexOf(T item)
        //{
        //    return this.CurrentPage.IndexOf(item);
        //}

        //public void Insert(int index, T item)
        //{
        //    this.CurrentPage.Insert(index, item);
        //}

        //public void RemoveAt(int index)
        //{
        //    this.CurrentPage.RemoveAt(index);
        //}

        //public T this[int index]
        //{
        //    get { return this.CurrentPage[index]; }
        //    set { this.CurrentPage[index] = value; }
        //}

        //public void Add(T item)
        //{
        //    this.CurrentPage.Add(item);
        //}

        //public void Clear()
        //{
        //    this.CurrentPage.Clear();
        //}

        //public bool Contains(T item)
        //{
        //    return this.CurrentPage.Contains(item);
        //}

        //public void CopyTo(T[] array, int arrayIndex)
        //{
        //    this.CurrentPage.CopyTo(array, arrayIndex);
        //}

        //public int Count
        //{
        //    get { return this.CurrentPage.Count; }
        //}

        //public bool IsReadOnly
        //{
        //    get { return this.CurrentPage.IsReadOnly; }
        //}

        //public bool Remove(T item)
        //{
        //    return this.CurrentPage.Remove(item);
        //}

        //public IEnumerator<T> GetEnumerator()
        //{
        //    return this.CurrentPage.GetEnumerator();
        //}

        //System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        //{
        //    return this.CurrentPage.GetEnumerator();
        //}

        //#endregion
    }
}
